const express = require('express');


//import database object
const db = require('../data/db-config');
module.exports = {
 find,
 findById,
 findSteps,
 add,
 update,
 remove    
};

//selecting all schemes
function find(){
    return db('schemes'); 
}

//here we are looking for the id in the schemes table and first to just return the single object,
function findById(id){
    return db('schemes')
    .where({ id })
    .first();
}

//joining table schemes and steps on both id fields
//where id in schemes table is equal to id entered
//selecting the fields to display in the results
//then ordering the steps in chronological order
 function findSteps(id){
     return db('schemes')
    .join('steps', 'schemes.id', '=','steps.scheme_id') //joining table schems and steps on both id dields
    .where({ 'schemes.id': id }) //table is equal to the id entered
    .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .orderBy( 'steps.step_number' ); 
}

//post
//instert will return id of newly inserted row
//then return will return the newly inserted record
function add(scheme){
    return db('schemes')
    .insert(scheme)
    .then( ([id]) => { 
        return findById(id);
    })
}
//put
// passing in to the newly updated recond
function update(changes, id){
    return db('schemes')
    .where({ id })
    .update(changes)
    .then( count => {
        findById(count[0]) 
    })
}
//delete - returns number of deleted items
function remove(id){
    return db('schemes')
    .where({ id })
    .del();
}