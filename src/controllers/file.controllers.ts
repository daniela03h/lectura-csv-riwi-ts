import { IDaneData } from '../models/file.model'



// Definicion de la clase del controlador
export class FileController {
    //Funcion que se encarga de convertir los datos que se leyeron el archivo a un objeto
    processData(csv: string): IDaneData[] {
        const rows = csv.split('\n')

        const data: IDaneData[] = []

        rows.forEach((row: string, index: number) => {
            if (index === 0) {
                return
            }
            const columns = row.split(/,\s*(?=(?:[^"]|"[^"]*")*$)/gi)

            const dataColumn: IDaneData = {
                region: columns[0],
                codigoDaneDepartamento: columns[1],
                departamento: columns[2],
                codigoDaneMunicipio: columns[3],
                municipio: columns[4]
            }

            data.push(dataColumn)
        })
        return data
    }
}