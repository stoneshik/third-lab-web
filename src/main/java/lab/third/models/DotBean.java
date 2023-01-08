package lab.third.models;

import java.io.Serializable;
import java.time.Clock;
import java.time.LocalTime;

public class DotBean implements Serializable {
    private static final long serialVersionUID = 1L;
    private Double x = 0.0;
    private Double y = 0.0;
    private Double r = 1.0;
    private boolean isHit = false;
    private LocalTime timeDispatch = LocalTime.now(Clock.systemUTC());
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

    public boolean getIsHit() {
        return isHit;
    }

    public LocalTime getTimeDispatch() {
        return timeDispatch;
    }

    public Long getTimeLead() {
        return timeLead;
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

    public void setIsHit(boolean hit) {
        this.isHit = hit;
    }

    public void setTimeDispatch(LocalTime timeDispatch) {
        this.timeDispatch = timeDispatch;
    }

    public void setTimeLead(Long timeLead) {
        this.timeLead = timeLead;
    }

    private boolean dotIsHit() {
        return (
            (this.x <= 0 && this.y >= 0 && Math.pow(this.x, 2) + Math.pow(this.y, 2) <= Math.pow(this.r / 2, 2)) ||
            (this.x >= 0 && this.y >= 0 && this.y <= -this.x + (this.r / 2)) ||
            (this.x >= 0 && this.y <= 0 && this.x <= this.r && this.y >= -this.r)
        );
    }

    public void updateInfo() {
        this.isHit = this.dotIsHit();
        this.timeDispatch = LocalTime.now(Clock.systemUTC());
    }
}
