(function init(){
    var displayContainer = document.getElementById('display_container'),
        listContainer = document.getElementById('listitems');
    // original Array given, Image Source and Name Given
    catArray = [
        {
            src: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg",
            name: "Mittens"
        },
        {
            src: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg",
            name: "Smittens"
        },
                {
            src: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg",
            name: "Buttons"
        },
        {
            src: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg",
            name: "Pancake"
        },
                {
            src: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg",
            name: "Flossy"
        },
        {
            src: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg",
            name: "Garfield"
        }
    ];

    // Creates item and appends it to the main container
    // Accepts an object

    function createBox(object, index) {
        var outerContainer = document.createElement('div');
            // create inner components
            headerEl = document.createElement('h2'), // heading
            imgEl = document.createElement('img'), // image
            countEl = document.createElement('h2'), // count
            // create list components
            listEl = document.createElement('li'); // list item
        
        // Create and set objects count to '0'
        object.count = 0;
        
        // Create meaningful Markup by setting attributes
        outerContainer.setAttribute('id', 'cat-container-' + index);
        outerContainer.classList.add("cat-container-item");
        imgEl.setAttribute('src', object.src);
        imgEl.setAttribute('id', 'img' + index);
        listEl.setAttribute('id', 'list-item-' + index);
        listEl.classList.add += "cat-list-item";

        // Fill in Values
        headerEl.innerText = object.name;
        countEl.innerText = object.count;
        listEl.innerText = object.name;
        countEl.setAttribute('id', 'counter-' + index);

        // Add components inside ImageContainer
        outerContainer.appendChild(headerEl);
        outerContainer.appendChild(imgEl);
        outerContainer.appendChild(countEl);

        // Add components to list
        listContainer.appendChild(listEl);

        imgEl.addEventListener('click', (function(indexNumber){
            var currentCount = catArray[indexNumber].count
            // Closure function: NOT ACTUALLY REQUIRED..overkill for this
            return function() {
                var relevantCounter= document.getElementById('counter-' + indexNumber);
                // Updates scoped item's count
                currentCount++
                // Updates scoped item's innerText
                relevantCounter.innerText = currentCount;
            }
        }(index)));

        listEl.addEventListener('click', function(){
            var correspondingCatContainer = document.getElementById('cat-container-' + index);
            addRemove(correspondingCatContainer);
        });

        //Removes class from all and adds only to required item
        function addRemove(chosenOne) {
            var allCatItems = document.getElementsByClassName('cat-container-item');
            for (i = 0; i < allCatItems.length; i++) { 
                allCatItems[i].classList.remove('is-active');
            }
            chosenOne.classList.add('is-active');
        }

        // Add new DOM item to main container
        displayContainer.appendChild(outerContainer);
    }
    // For each item within the Array run the create Box function
    catArray.forEach(createBox);
})();




