let url: string = 'localhost:4200'
let protocolo: string = 'http://'

export const environment = {
    production: false,
    api: {
        local: `${protocolo}${url}/`,
        desafio_rest: `${protocolo}api-desafio.localhost/api/v1/`
    }
};
