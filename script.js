



let inp = document.querySelector('body main input')
console.log(inp);

let inpval = inp.value
console.log(inpval);

let btn = document.querySelector('body main button')
console.log(btn);

let body = document.querySelector('body')
let main = document.querySelector('main')

let ul = document.createElement('ul')
let li = document.createElement('li')



var text

btn.addEventListener('click', () => {
    const word = inp.value.trim(); // Get user input and trim spaces
    if (word === "") {
        alert("Please enter a word!");
        return;
    }

        // Clear previous results (clear all child nodes of the ul)
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Word not found");
            }
            return response.json();
        })


        .then(data => {

            console.log('data ->',data);
            console.log('data[0] ->',data[0]);
            console.log('data[0].meanings ->',data[0].meanings);
  
            // first li created
            
            const li = document.createElement('li')
            const lihead = document.createTextNode(data[0].word)
            li.appendChild(lihead)
            ul.appendChild(li)


            // second li created
            const li2 = document.createElement('li')
            const lihead2= document.createTextNode('synonyms')
            li2.appendChild(lihead2)
            ul.appendChild(li2)


            // third li created
            const li3 = document.createElement('li')
            const lihead3= document.createTextNode('antonyms')
            li3.appendChild(lihead3)
            ul.appendChild(li3)
            


            
            data[0].meanings.forEach(e => {
                e.definitions.forEach( (a) => {
                    let nestedli = document.createElement('li')
                    let nestedtext = document.createTextNode(a.definition)
                    nestedli.appendChild(nestedtext)
                    li.appendChild(nestedli)
                });




                    e.synonyms.forEach((s) => {
                        let nestedLi2 = document.createElement('li');
                        let nestedText2 = document.createTextNode(s);
                        nestedLi2.appendChild(nestedText2);
                        li2.appendChild(nestedLi2)
                    }) ;



                    e.antonyms.forEach( ant => {
                        let nestedli3 = document.createElement('li')
                        let nestedtext3 = document.createTextNode(ant)
                        nestedli3.appendChild(nestedtext3)
                        li3.appendChild(nestedli3)
                    });

            });

})

        .catch(error => {
            text = document.createTextNode("Word not found or an error occurred.");
            li.appendChild(text)
            ul.appendChild(li)
        });
        main.appendChild(ul)
})


body.appendChild(main)
