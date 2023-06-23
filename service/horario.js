
// checkHorario -> Checa se dentro de uma lista de agendamentos
// contém algum choque de horários com o agendamento informado.
function checkHorario(agendamentos, agendamento) {

    if (agendamentos.length > 0) {
        const choques = agendamentos.filter(agend => {
            return (Date.parse(agendamento.datetimeInic) <= Date.parse(agend.datetimeFim) &&
                Date.parse(agendamento.datetimeInic) >= Date.parse(agend.datetimeInic)) ||
                (Date.parse(agendamento.datetimeFim) >= Date.parse(agend.datetimeInic) &&
                    Date.parse(agendamento.datetimeFim) <= Date.parse(agend.datetimeFim));
        });

        if (choques.length > 0) {
            return true;
        }
    }

    return false;
}

module.exports = { checkHorario };
