# vaitrade-assignment
calculates lexical density for given string input by overall and per sentence measures

## Usage
run the commmand `docker-compose up` with docker installed to get node and mongodb up and running. <br />

visit route GET /addDefaultWords to store the default non-lexical words included in the project. 
Otherwise, store your own non-lexical words in the db according to the schema defined <br />

To get the total lexical density, make a POST request to /complexity with the following request body

`{
    input: 'enter your string here'
 }`
 
 eg output : 
 
 `
 {data: overall_ld: 0.67}
 `

To get the total lexical density and LD broken down per sentence,  make a POST request to /complexity?mode=verbose 

`
{ input: 'enter your string here. enter another string here' }
`

eg: output: 

`{data: { overall_ld: 0.75, sentence_ld: [0.5, 1] }}`
