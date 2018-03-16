//DEFINE
var $ = jQuery;
var dagen = [
    "Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"
];
var maanden = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"
];
Date.prototype.addDays = function(d) { return new Date(this.valueOf() + 864E5 * d); };
var yesterday = new Date().addDays(-1);

$(() => {
    let $AlleActiviteiten = tbody('#AlleActiviteiten');
    let $Mercurius = tbody('#Mercurius');

    getData((data) => {
        var alleData = data.filter((el => el.jsonDate > yesterday)).sort((a, b) => a.jsonDate - b.jsonDate);
        var mercuriusData = data.sort((a, b) => a.jsonDate - b.jsonDate).filter(event => event.organization == 'Mercurius');
        buildCalendar(alleData, $AlleActiviteiten);
        buildCalendar(mercuriusData, $Mercurius);
    });

    function tbody(idString) {
        //DOM
        var $aa_tab = $(idString);
        var $aa_table = $aa_tab.find('table');
        $aa_table.empty();
        //DOM_MAN
        return $aa_table.append($('<tbody/>'));
    }

    function getData(cb) {
        //AJAX
        $.ajax({
            url: '/rest/clubs.php',
        }).done(data => {
            console.log(data);
            data = data.map((el) => {
                el.jsonDate = new Date(el.machine_date);
                return el;
            });
            cb(data);
        });
    }

    function buildCalendar(data, $element) {

        let kalender = [];
        data.forEach((el) => {
            var year = el.jsonDate.getFullYear()
            kalender[year] = kalender[year] || [];
            return kalender[year].push(el);
        });

        kalender.forEach((year, index) => {
            $element.append($('<thead/>').append($('<th/>').attr('colspan', 4).text(index)));
            var $year_body = $('<tbody/>');

            year.forEach(event => {
                var $newRow = $('<tr/>')
                    .addClass(event.organization)
                    .append($('<td/>').text(dagen[event.jsonDate.getDay()]).css("text-align", "right").addClass(""))
                    .append($('<td/>').text(`${event.jsonDate.getDate()} ${maanden[event.jsonDate.getMonth()]}`))
                    .append($('<td/>').text(event.title))
                    .append($('<td/>').text(event.organization));
                $year_body.append($newRow);
            });
            $element.append($year_body);
        });
    }
});