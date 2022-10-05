package com.codecool.imdb.domain.common;

import lombok.Getter;

@Getter
public class Result{
    private final Boolean Success;
    private final String Error;
    private final Boolean Failrule;

    public Result(Boolean success, String error) {
        Success = success;
        Error = error;
        Failrule = !success;
    }


}
