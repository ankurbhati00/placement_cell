// let elm = document.getElementById('placement-status');
//     elm.addEventListener('click', () => {
//         let id = elm.getAttribute('data-id');
//         let div = document.createElement('div');
//         let insideDiv = document.createElement('div');
//         let notPlaced = document.createTextNode('not placed');
//         elm.append()
//     });
class interviewResult {
  constructor(e) {
    this.setObj(e);
  }

  setObj(self) {
    $(self).hover(
      () => {
            let student_id = $(self).attr("data-id");
            let interview_id = $(self).attr("data-interview");
        $(self).append(
          $(
            `<div id="result-list" >
                    <div class="result-list"><a href="interview-result/${student_id}?interview_id=${interview_id}&result=pass">Pass</a></div>
                    <div class="result-list"><a href="interview-result/${student_id}?interview_id=${interview_id}&result=fail">Fail</a></div>
                    <div class="result-list"><a href="interview-result/${student_id}?interview_id=${interview_id}&result=onhold">On hold</a></div>
                    <div class="result-list"><a href="interview-result/${student_id}?interview_id=${interview_id}&result=didnotattempt">Didn't Attempt</a></div>
             </div>
                    `
          )
        );
        //add event to result-list items
            for (let a of $(".result-list>a")) {
                $(a).click((event) => {
                    event.preventDefault();
                    $.ajax({
                        type: 'post',
                        url: $(a).attr('href'),
                        success: (data) => {
                            console.log(data.data);
                            $(self).html(data.data);
                        }, error: (error) => {
                            console.log("Error in send interview result to db", error.responseText);
                        }
                    });
                });
            }


      },
      () => {
        $("div").remove("#result-list");
      }
    );
  }
}
