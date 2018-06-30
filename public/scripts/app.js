console.log("Sanity Check: JS is working!");
var template;
var $carsList;
var allCars = [];

$(document).ready(function(){

  $carsList = $('#carTarget');

  // compile handlebars template
  var source = $('#cars-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/cars',
    success: handleSuccess,
    error: handleError
  });

  $('#newCarForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/cars',
      data: $(this).serialize(),
      success: newCarSuccess,
      error: newCarError
    });
  });

  $carsList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/cars/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/cars/'+$(this).attr('data-id'),
      success: deleteCarSuccess,
      error: deleteCarError
    });
  });

});

// helper function to render all posts to view
function render () {
  // empty existing posts from view
  $carsList.empty();

  var carHtml;

  // for each car:
  allCars.forEach(function(carData){
    carHtml = template({car: carData});
    $carsList.append(carHtml);
  });
};

function handleSuccess(json) {
  allCars = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#carTarget').text('Failed to load cars, is the server working?');
}

function newCarSuccess(json) {
  $('#newCarForm input').val('');
  allCars.push(json);
  render();
}

function newCarError() {
  console.log('newcar error!');
}

function deleteCarSuccess(json) {
  var car = json;
  console.log(json);
  var carId = car._id;
  console.log('delete car', carId);
  for(var index = 0; index < allCars.length; index++) {
    if(allCars[index]._id === carId) {
      allCars.splice(index, 1);
      break;  
    }
  }
  render();
}

function deleteCarError() {
  console.log('deleteCar error!');
}
