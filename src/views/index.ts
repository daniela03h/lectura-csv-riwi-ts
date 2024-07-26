import {processData} from '../controllers/file.controllers'
import { IDaneData } from '../models/file.model'

const inputFile = document.querySelector("#file-input") as HTMLInputElement
//const formSearch = document.querySelector(".form-search") as HTMLFormElement
const inputSearch = document.querySelector(".input-search") as HTMLInputElement

let dataDane: IDaneData[] = []

// let limitPage = 15 
// let init =

window.addEventListener("DOMContentLoaded", () => {
    inputFile.addEventListener("change", onFileChange)
    inputSearch.addEventListener("input", onSearchSubmit)
})

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
        dataDane = processData(csv)
        console.log("result", dataDane);
        renderTable(dataDane)

    })

    reader.readAsText(file)
}

function onSearchSubmit(event:Event) {
    event.preventDefault()
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

function renderTable(data: IDaneData[]) {
    const container = document.querySelector(".container-list") as HTMLDivElement;

    container.innerHTML = `
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
                ${data.map(item => 
                    
                    `
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
}

