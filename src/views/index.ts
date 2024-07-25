import {processData} from '../controllers/file.controllers'
import { Idata } from '../models/file.model'

const inputFile = document.querySelector("#file-input") as HTMLInputElement

window.addEventListener("DOMContentLoaded", () => {
    inputFile.addEventListener("change", onFileChange)
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
        const result = processData(csv)
        console.log("result", result);
        renderTable(result)

    })

    reader.readAsText(file)
}

function renderTable(data: Idata[]) {
    const container = document.querySelector(".container");

     if (!container) {
        console.error("No se encontró el contenedor .container");
        return;
    } 

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
}

