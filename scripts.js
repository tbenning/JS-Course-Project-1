// A question is loaded from the data
// A user clicks a question, it loads the question from the object
// There are 4 or more answers loaded, one of which is correct

$(function() { 

// Question data to load 
    const questions = [
        {
            title: 'Question 1',
            prompt: 'Of all the doggos the wurld, who is the fluffest?',
            answers: {
                a: "Sir Hubert J Pennysworth",
                b: "Swan Ronson",
                c: "Air Bud",
                d: "Scout",
                e: "Jagger",
            },
            correctAnswer: "d",
        },
        {
            title: 'Question 2',
            prompt: `Canada is the world's second largest exporter of what fruit?`,
            answers: {
                a: "Cantaloupe",
                b: "Blueberries",
                c: "Wintermelon",
                d: "Strawberries"
            },
            correctAnswer: "b"
        },
        {
            title: 'Question 3',
            prompt: 'What is the state when someone is completely absorbed with the activity and situation at hand, commonly referred to in game mechanics and learning?',
            answers: {
                a: "Intrinsic motivation",
                b: "Flow",
                c: "Control",
                d: "Mastery"
            },
            correctAnswer: "b"
        },
        {
            title: 'Question 4',
            prompt: 'In Seinfield, how many girlfriends did Jerry have over the course of 9 seasons?', 
            answers:{
                a: "79",
                b: "54",
                c: "73",
                d: "69"
            },
            correctAnswer: "c"
        }
    ];
   
    // Build questions
    function buildQuestions () {
        for (let thisQuestion in questions){ 
            //To Do: Build the sidenav

            //Render out the heading and question 
            $('.questionContainer').append(`
                <div class="question-${thisQuestion} question">
                    <div class="questionHeader">
                        <h1>${questions[thisQuestion].title}</h1>
                        <p>Unanswered</p>
                    </div>
                    <div class="questionBody">
                        <p>${questions[thisQuestion].prompt}</p>
                        <form action="" class="questionForm"></form>
                    </div>
                </div>   
                `
            );

            // Make an array of answers for thisQuestion
            const answers = questions[thisQuestion].answers;

            //render out all the answers 
            for (answer in answers){
                $('.question-' + thisQuestion + ' .questionForm').append(`
                <label class="container">
                    <span class="answer">${answer}. ${answers[answer]}</span>
                    <input type="radio" name="radio" value="${answer}">
                    <span class="checkmark"></span>
                </label>`
                )};

            //render out the button and close the form
            $(`.question-${thisQuestion} .questionForm`).append(`
                <div class="questionFooter">
                    <button type="submit" class="submitButton"> Check Answer</button>
                </div>`
            );
        };
    }

 
    function checkAnswer (event, thisQuestion) {
        //Prevent default behaviour
        event.preventDefault();
       
        // Assign the user answer from the input
        let userAnswer = $(`.question-${thisQuestion} input[name=radio]:checked`).val();

        // Assign the correct answer 
        const correctAnswer = questions[thisQuestion].correctAnswer;

        if (userAnswer == correctAnswer) {
            alert('Congrats! You have the correct answer!')
        } else {
            alert('Sorry, you\'re incorrect.')           
        }   

        $(`.question-${thisQuestion} .questionHeader p`).text('Answered');
    } 

    buildQuestions();
    
    // Check the answer on submission
    // DRY!!! Whoops. 
    
    for (let thisQuestion in questions){
        // Check if a radio button is selected, then make the container class active
        $(`.question-${thisQuestion} .container`).on('click', function(){
            $(`.question-${thisQuestion} .container`).removeClass('selected');
            $(this).addClass('selected');
        });
        // Check if on submission if the answer is correct
        $(`.question-${thisQuestion} form`).on('submit', function () {
            checkAnswer(event, thisQuestion);
        });
    }
    

    // All other behaviour
    // Listen if a list item in the sidebar is clicked, if so add a class "active"
    $('.sidebar li').on('click', function() {
        console.log('sidebar clicked');
        // Check all the items and remove classes
        $('.sidebar li ').removeClass('active');
        // Add class to this item that was clicked
        $(this).addClass('active');

        //Scroll to specific position onClick
        $('html, body').animate({
            scrollTop: $('.question-1').offset().top - 100
        }, 200);
    });


});