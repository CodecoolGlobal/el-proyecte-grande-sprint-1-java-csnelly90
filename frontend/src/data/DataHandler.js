export const dataHandler = {

    apiGet: async function(url) {
        let response = await fetch(url, {
            method: "GET",
        });
        if (response.ok) {
            return await response.json();
        }
    },

    apiPost: async function(url, payload) {
        await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
    },

    apiDelete: async function(url) {
        await fetch(url, {
            method: "DELETE",
        });
    },

    apiPut: async function(url, payload) {
        await fetch(url, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });

    },

    apiPatch: async function(url) {
        let response = await fetch(url, {
            method: "PATCH"
        });
        if (response.ok) {
            return await response.json()
        }
    }
}