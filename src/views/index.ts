import { FileController } from '../controllers/file.controllers'
import { IDaneData } from '../models/file.model'

//Se instacia controlador 
const fileController = new FileController

const inputFile = document.querySelector("#file-input") as HTMLInputElement
const inputSearch = document.querySelector(".input-search") as HTMLInputElement

let dataDane: IDaneData[] = []
let limitPage = 15
let sincePage = 0
let pages = 0
let pageActive = 1

//Se agrega el evento para que se ejecute cuando todo el contenido de la pagina seca cargado 
window.addEventListener("DOMContentLoaded", () => {
    inputFile.addEventListener("change", onFileChange)
    inputSearch.addEventListener("input", onSearchSubmit);

    //Se agregan evento al los botones de la paginacion
    (document.querySelector(".button-previous") as HTMLButtonElement).addEventListener("click", () => {
        if (pageActive === 1) return
        pageActive = pageActive - 2
        window.changePage(pageActive)

    });

    (document.querySelector(".button-next") as HTMLButtonElement).addEventListener("click", () => {
        console.log('pages', pages)
        if (pageActive === pages) return
        window.changePage(pageActive)
    })
})

//Funcion para leer el archivo 
function onFileChange() {
    if (inputFile.files?.length === 0) {
        alert("Debe seleccionar un archivo CSV")
        return
    }

    const file = inputFile.files?.[0]

    if (file?.type !== "text/csv") {
        alert("El archivo no es CSV")
        inputFile.form?.reset()
        return
    }

    const reader = new FileReader()

    reader.addEventListener('load', (event) => {
        const csv = event.target?.result as string
        dataDane = fileController.processData(csv)
        pages = Math.ceil(dataDane.length / limitPage)
        renderTable(dataDane.slice(0, 14))

    })

    reader.readAsText(file)
}

// Funcion para buscar en el archivo
function onSearchSubmit() {
    const result = inputSearch.value.toLowerCase()
    const dataFilter = dataDane.filter((item) => {
        const region = item.region?.toLowerCase() || '';
        const codigoDaneDepartamento = item.codigoDaneDepartamento?.toLowerCase() || '';
        const departamento = item.departamento?.toLowerCase() || '';
        const codigoDaneMunicipio = item.codigoDaneMunicipio?.toLowerCase() || '';
        const municipio = item.municipio?.toLowerCase() || '';

        return region.includes(result) ||
            codigoDaneDepartamento.includes(result) ||
            departamento.includes(result) ||
            codigoDaneMunicipio.includes(result) ||
            municipio.includes(result)
    })
    renderTable(dataFilter)
}


//Funcion para pintar el archivo dinamicamente
function renderTable(data: IDaneData[]) {
    const container = document.querySelector(".container-list") as HTMLDivElement;

    container.innerHTML = `
    <h3>${pageActive}</h3>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">REGION</th>
                    <th scope="col">CÓDIGO DANE DEL DEPARTAMENTO</th>
                    <th scope="col">DEPARTAMENTO</th>
                    <th scope="col">CÓDIGO DANE DEL MUNICIPIO</th>
                    <th scope="col">MUNICIPIO</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(item => `
                    <tr>
                        <th scope="row">${item.region}</th>
                        <td>${item.codigoDaneDepartamento}</td>
                        <td>${item.departamento}</td>
                        <td>${item.codigoDaneMunicipio}</td>
                        <td>${item.municipio}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;


    for (let i = 0; i < pages; i++) {
        const item = document.createElement('li') as HTMLLIElement
        item.classList.add('page-item')
        const link = `<button class="page-link" onclick="changePage(${i})">${i + 1}</button>`
        item.innerHTML = link;
        (document.querySelector("#items") as HTMLDivElement).append(item);
    }


}

// Se agrega funcion global para utilizar como handler de los botones de cada pagina
window.changePage = (pages: number) => {
    pageActive = pages + 1
    sincePage = limitPage * pages

    if (sincePage <= dataDane.length) {
        const array = dataDane.slice(sincePage, limitPage * pageActive)
        renderTable(array)
    }
};



