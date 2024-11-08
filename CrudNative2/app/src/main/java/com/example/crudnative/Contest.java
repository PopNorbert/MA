package com.example.crudnative;

import java.io.Serializable;
import java.util.Date;

public class Contest implements Serializable {
    private final String id;
    public String name;
    public Category category;
    public String location;
    public Date date;

    public Contest(String id, String name, Category category, String location, Date date) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.location = location;
        this.date = date;
    }

    public String getId() {
        return id;
    }
}