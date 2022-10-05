package com.codecool.imdb.domain.common;

public class ResultWithValue<T> extends Result{
    private T value;

    public ResultWithValue(Boolean success, String error, T value) {
        super(success, error);
        this.value = value;
    }

    public T getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "ResultWithValue{" +
                "value=" + value +
                '}';
    }
}
