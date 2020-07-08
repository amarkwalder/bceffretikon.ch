import fs from 'fs';
import yaml from 'js-yaml';

export function get(req, res) {
    const holidays = yaml.load(fs.readFileSync('static/data/holidays.yml', { encoding: 'utf-8' }));

    if (holidays) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(holidays.holiday));
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json',
        });
        res.end(
            JSON.stringify({
                message: `Not found`,
            }),
        );
    }
}
