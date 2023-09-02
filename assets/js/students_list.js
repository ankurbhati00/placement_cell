class Students {
  constructor(elm) {
    this.changeStatus(elm);
  }

  changeStatus(elm) {
    $(elm).on("click", (event) => {
      event.preventDefault();
      let id = $(elm).attr("data-id");
      $(`#${id}`).append(`
<form action="/${id.substring(14)}" method="post">
<input type="radio" name="placementstatus" id="placed" value="Placed"/>
<label for="placed">Placed </label><br>
<input type="radio" name="placementstatus" id="not_placed" value="Not Placed" />
<label for="not_placed">Not Placed </label><br>

<button> set </button>
 </form>
    `);
    });
  }
}
