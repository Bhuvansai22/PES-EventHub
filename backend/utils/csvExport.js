import { Parser } from 'json2csv';

export const generateCSV = (data, fields) => {
    try {
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(data);
        return csv;
    } catch (error) {
        throw new Error('Error generating CSV: ' + error.message);
    }
};
