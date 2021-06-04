updateFlag();
$('#input0').click(updateFlag);

function updateFlag() {
   const flagName = $("select#input0 :selected").val();
   $("select#input0").attr('style', `background-image:url(img/${flagName}.png);background-repeat:no-repeat;background-position:center;`);
   console.log('select color: ' + flagName);
}