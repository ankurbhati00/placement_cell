class InterviewsList {
  constructor(elm) {
    this.interview = $(elm);
    this.deleteFunc(elm);
  }

  deleteFunc(elm) {
    $(elm).on("click", (event) => {
      event.preventDefault();
      let id = $(elm).attr('data-id');
      $(`#${id}`).append(`
<form action=${$(elm).prop("href")}  method="post">
<strong> select date and time </strong>
<input type="datetime-local" name="datetime" value="" required>
<button>set</button>
 </form>
            `);

      
    });
  }
}
