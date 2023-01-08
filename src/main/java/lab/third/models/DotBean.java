package lab.third.models;

import java.io.Serializable;
import java.time.LocalDate;

public class DotBean implements Serializable {
    private static final long serialVersionUID = 1L;
    private Double x = 0.0;
    private Double y = 0.0;
    private Double r = 1.0;
    private boolean isHit = false;
    private LocalDate timeDispatch;
    private Long timeLead;

    public Double getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public Double getR() {
        return r;
    }

    public boolean isHit() {
        return isHit;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public void setHit(boolean hit) {
        this.isHit = hit;
    }

    private boolean dotIsHit() {
        return (
            (this.x <= 0 && this.y >= 0 && Math.pow(this.x, 2) + Math.pow(this.y, 2) <= Math.pow(this.r / 2, 2)) ||
            (this.x >= 0 && this.y >= 0 && this.y <= -this.x + (this.r / 2)) ||
            (this.x >= 0 && this.y <= 0 && this.x <= this.r && this.y >= -this.r)
        );
    }

    public void updateHitState() {
        this.isHit = this.dotIsHit();
    }
}
