const readLine = require('readline');
const fs = require('fs');

const readInterface = readLine.createInterface(
    {
        //файл необходимо предварительно сохранить с кодировкой  utf8
        input: fs.createReadStream("./tarif.txt", 'utf8'),
       // output: process.stdout,
        console: false
    }
);

let result = [];

readInterface.on('line', input => {
    ///let regex = /[a-zа-я0-9,.\s]/gi;
    let regex = /\{.*\}/gi;
    //result.push(input.match(regex))

    //input1 = input.replace(/{""name"":""([а-я0-9,.\s]+)"",""value"":""(\d+,*\d*)"",""number"":""([\d.]+)""}/gi, (name, value, number) => `name: ${name}`)
    let len = input
            .replace(/"/g,'')
            .match(/{.+?}/gi)
            .map(e => {
                const [string, name, value, number] = /name:(.*),value:(.*),number:(.*)}/gi.exec(e);
                return {name, value, number}
            })
    
    
            console.log(len)
})