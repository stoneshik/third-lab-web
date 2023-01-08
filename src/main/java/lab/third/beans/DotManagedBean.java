package lab.third.beans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Model;
import lab.third.models.DotBean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Model
@ApplicationScoped
public class DotManagedBean implements Serializable {
    private static final long serialVersionUID = 1L;
    private DotBean newDot = new DotBean();
    private List<DotBean> dotBeans = new ArrayList<>();

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
        Long startTime = System.nanoTime();
        this.newDot.updateInfo();
        this.dotBeans.add(this.newDot);
        this.newDot = new DotBean();

    }
}
