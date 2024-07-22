port_table = {
    // All values in gigabit per second
    "HDMI 1.0 / DVI": 3.96,
    "HDMI 1.3": 8.16,
    "DisplayPort 1.1": 8.64,
    "HDMI 2.0": 14.4,
    "DisplayPort 1.2": 17.28,
    "DisplayPort 1.4": 25.92,
    "HDMI 2.1": 42.0,
    "DisplayPort 2.0": 77.36
}

function bgcolor(percentage)
{
    if (percentage >= 100)
    {
        return "danger";
    }
    else if (percentage >= 80)
    {
        return "warning";
    }
    else
    {
        return "success";
    }
}

function calc()
{
    // Get values entered by user
    width = parseFloat(document.getElementById("screen-width").value);
    height = parseFloat(document.getElementById("screen-height").value);
    hz = parseFloat(document.getElementById("screen-hz").value);
    bit_depth = 24;

    // Calculate data rate
    gigabits = (((width * height) * bit_depth) * hz) / 1000000000.0;

    // Compare to known ports
    checked_ports = []
    for(const port in port_table)
    {
        checked_ports.push({
            name: port,
            usage: (gigabits / port_table[port]) * 100
        })
    }

    // Render Template
    result_div = document.getElementById("result")
    result_div.innerHTML = `
    <p class="fs-5 col-md-8">Video Mode: <b>${width + "x" + height + "@" + hz + "Hz"}</b><br/>
    Bandwidth Usage: <b>~${Number(gigabits.toFixed(2))} Gb/s</b></p>
    <table class="table">
        <tbody>
            ${checked_ports.map(i => `
                <tr class="table-${bgcolor(i.usage)}">
                    <td>${i.name}</td>
                    <td>${Number(i.usage.toFixed(1))}% Bandwidth Usage</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    <small>Red = Will not work<br/>Yellow = Might work<br/>Green = Will likely work</small>
    `
    result_div.scrollIntoView();

    // This is to prevent reload on form submit
    return false;
}