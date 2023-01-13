package lab.third.beans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Model;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import lab.third.models.DotBean;

import java.io.Serializable;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.function.Consumer;


@Model
@ApplicationScoped
public class DotManagedBean implements Serializable {
    private static final long serialVersionUID = 1L;
    private final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory(
            "connection"
    );
    private DotBean newDot = new DotBean();
    private List<DotBean> dotBeans = new CopyOnWriteArrayList<>();

    public DotManagedBean() {
        initTransaction(manager -> this.dotBeans.addAll(
                manager.createQuery("SELECT entity FROM DotBean entity", DotBean.class).getResultList()
        ));
    }

    public DotBean getNewDotBean() {
        return newDot;
    }

    public List<DotBean> getDotBeans() {
        return dotBeans;
    }

    public void setNewDot(DotBean newDotBean) {
        this.newDot = newDotBean;
    }

    public void setDotBeans(List<DotBean> dotBeans) {
        this.dotBeans = dotBeans;
    }

    public boolean isEmpty() {
        return this.dotBeans.isEmpty();
    }

    public synchronized void addNewDot() {
        long startTime = System.nanoTime();
        this.newDot.updateInfo();
        this.newDot.setTimeLead(System.nanoTime() - startTime);
        this.initTransaction(manager -> manager.persist(this.newDot));
        this.dotBeans.add(0, this.newDot);
        this.newDot = new DotBean();
    }

    public synchronized void removeAllDots() {
        EntityManager manager = this.entityManagerFactory.createEntityManager();
        try {
            manager.getTransaction().begin();
            manager.createQuery("DELETE FROM DotBean").executeUpdate();
            manager.getTransaction().commit();
        } catch (Exception ex) {
            if (manager.getTransaction().isActive()) {
                manager.getTransaction().rollback();
            }
            System.out.println("An exception occurred during transaction.");
            ex.printStackTrace();
        } finally {
            manager.close();
        }
        this.dotBeans.clear();
    }

    private void initTransaction(Consumer<EntityManager> transaction) {
        EntityManager manager = this.entityManagerFactory.createEntityManager();
        try {
            manager.getTransaction().begin();
            transaction.accept(manager);
            manager.getTransaction().commit();
        } catch (Exception ex) {
            if (manager.getTransaction().isActive()) {
                manager.getTransaction().rollback();
            }
            System.out.println("An exception occurred during transaction.");
            ex.printStackTrace();
        } finally {
            manager.close();
        }
    }
}
