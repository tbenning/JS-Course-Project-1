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
        }];
   


    // Build questions
    function buildQuestions () {
        for (let thisQuestion in questions){   
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

    // Block regular submission behaviour
    // If its correct, it displays a message "Your answer is correct!"
    // If its incorrect, it displays a message "Your answer is incorrect, try again"

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
            console.log("Incorrect answer");   
            console.log(`Correct aswe ${correctAnswer}`);
            console.log(`Chosen answer ${userAnswer}`);            
        }   

        $(`.question-${thisQuestion} .questionHeader p`).text('Answered');
    } 

    buildQuestions();
    
    // Check the answer on submission
    // DRY!!!
    $('.question-0 form').on('submit', function () {
        checkAnswer(event, 0);
    });
    $('.question-1 form').on('submit', function () {
        checkAnswer(event, 1);
    });
    $('.question-2 form').on('submit', function () {
        checkAnswer(event, 2);
    });
    
    // All other behaviour
    // Listen if a list item in the sidebar is clicked, if so add a class "active"
    $('.sidebar li').on('click', function() {
        console.log('sidebar clicked');
        // Check all the items and remove classes
        $('.sidebar li ').removeClass('active');
        // Add class to this item that was clicked
        $(this).addClass('active');
    });


});