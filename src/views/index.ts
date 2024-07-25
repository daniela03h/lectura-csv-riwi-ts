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
        processData(csv)
    })

    reader.readAsText(file)
}

function processData(csv: string) {
    const rows = csv.split('\n')

    const data = []

    rows.forEach((row: string, index: number)=>{
        if(index === 0){
            return
        }
        const columns = row.split(',')
        
        const dataColumn = {
            region: columns[0],
            codigoDaneDepartamento: columns[1],
            departamento: columns[2],
            codigoDaneMunicipio: columns[3],
            municipio: columns[4]
        }
        
        data.push(dataColumn)
    })

    console.log(data);
    

}

