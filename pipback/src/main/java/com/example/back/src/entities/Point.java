package com.example.back.src.entities;

import javax.persistence.*;

@Entity
@Table(name = "Point")
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double x;
    private Double y;
    private Double r;
    private String owner;
    private Boolean result;

    public Point() {

    }

    public Point(Double x, Double y, Double r, String owner) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.owner = owner;
        this.result = this.calculateResult();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }


    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public Boolean getResult() {
        return result;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }

    //TODO
    private Boolean calculateResult() {
        return  x <= 0 && x >= -r && y <= 0 && y >= -r ||
                x >= 0 && y <= 0 && x*x + y*y <= r*r/4 ||
                x <= 0 && y >= 0 && y <= r/2 + x/2 && x >= -r && y <= r/2;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("id: ").append(this.id).append("\n");
        builder.append("x: ").append(this.x).append("\n");
        builder.append("y: ").append(this.y).append("\n");
        builder.append("r: ").append(this.r).append("\n");
        builder.append("owner: ").append(this.owner).append("\n");
        builder.append("result: ").append(this.result).append("\n");
        return builder.toString();
    }
}
