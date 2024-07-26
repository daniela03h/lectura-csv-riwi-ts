import { IDaneData } from '../models/file.model'

export function processData(csv: string): IDaneData[] {
    const rows = csv.split('\n')

    const data: IDaneData[] = []

    rows.forEach((row: string, index: number) => {
        if (index === 0) {
            return
        }
        const columns = row.split(',')

        const dataColumn: IDaneData = {
            region: columns[0],
            codigoDaneDepartamento: columns[1],
            departamento: columns[2],
            codigoDaneMunicipio: columns[3],
            municipio: columns[4]
        }

        data.push(dataColumn)
    })

    console.log(data);
    return data
}

