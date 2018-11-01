//We need a function to search the parks api
//we need a function to create the result in html
//we need a function to render the result
//we need a function to watch the form and call the other functions as needed
//also a function to format the query params

'use strict';

const apiKey = 'b5UimDNB3W8LdVC6g99ZVIr5fv4X8VMfyzRR12pW'; 
const searchURL = 'https://developer.nps.gov/api/v1/';

//function formatParams(params){
//    function formatQueryParams(params) {
//        const queryItems = Object.keys(params)
//          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//        return queryItems.join('&');
//      }

//}

function accessApi(searchTerm, numberOfResults, state, callback){
    let url = 'https://developer.nps.gov/api/v1/parks?'
    let params = {
        stateCode: `${state} in:name`,
        limit: `${numberOfResults} in:name`,
        start: 1,
        q: `${searchTerm} in:name`
    };
    $.getJSON(url, params, callback)

}

function renderResult(result){
    return `
    <div class="js-search-results>
        <p>${result.data.fullName}<p>
        <p>${result.data.description}<p>
        <p>${result.data.url}<p>
    `

} 

function displaySearchData(object){
    const results = object.data.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);


}

function watchSubmit(){
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        const stateTarget = $(event.currentTarget).find('.js-state');
        const state = stateTarget.val();
        const numberTarget = $(event.currentTarget).find('.js-number');
        const number = numberTarget.val();
        // clear out the input
        queryTarget.val("");
        accessApi(query, number, state, displaySearchData);
      });


}

$(watchSubmit);