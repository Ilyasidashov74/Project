function mkChange(node) {
    let price = document.getElementById('happy').value;
    document.getElementById('total').innerHTML = node.value * price;
    let select = document.getElementById("mk");
    let opti = select.options[select.selectedIndex].value;
    document.getElementById('total').innerHTML = node.value * opti;

};