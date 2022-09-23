import { ACCESS_TOKEN } from '../constants/constants';

function createRequestHeaders() {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    return headers;
}

export const dataHandler = {

    login: function(loginRequest) {
        return this.apiPost("/api/auth/login", loginRequest);
    },

    signup: function(signupRequest) {
        return this.apiPost("/api/auth/signup", signupRequest);
    },

    getCurrentUser: async function() {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return this.apiGet("/api/users/me")
    },

    apiGet: async function(url) {
        let response = await fetch(url, {
            method: 'GET',
            headers: createRequestHeaders()
        });
        if (response.ok) {
            return await response.json();
        }
    },

    apiPost: async function(url, payload) {
        let response = await fetch(url, {
            method: 'POST',
            headers: createRequestHeaders(),
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            return await response.json();
        }
    },

    apiDelete: async function(url) {
        await fetch(url, {
            method: 'DELETE',
            headers: createRequestHeaders()
        });
    },

    apiPut: async function(url, payload) {
        await fetch(url, {
            method: 'PUT',
            headers: createRequestHeaders(),
            body: JSON.stringify(payload)
        });

    },

    apiPatch: async function(url) {
        let response = await fetch(url, {
            method: 'PATCH',
            headers: createRequestHeaders()
        });
        if (response.ok) {
            return await response.json()
        }
    }
}