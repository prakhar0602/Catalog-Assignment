const fs = require('fs');

function main() {

    // Read the file
    let inp = fs.readFileSync('input.json');
    inp = JSON.parse(inp);

    inp.forEach(input=>{
        const keys = input.keys;
        const n = keys.n; 
        const k = keys.k;
        const points = [];
        
        //Decoding
        for (const key in input) {
            if (key !== 'keys') {
            const base = parseInt(input[key].base);
            const value = input[key].value;
            const decodedValue = parseInt(value, base);
            const x = parseInt(key);
            points.push([x, decodedValue]);
        }
    }
    //Finding C
    let c = points.reduce((sum, [x, y]) => {
        const term = points.reduce((prod, [xi, _]) => {
            if (xi === x) return prod; 
            return prod * (0 - xi) / (x - xi);
        }, 1);
        return sum + y * term;
    }, 0);
    
    c = Math.round(c);
    console.log('The constant term (c) of the polynomial is:', c);
})

}
main();
