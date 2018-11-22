$(document).ready(function(){

	var pokeName;

	$("#search").keypress(function(event){
		if(event.keyCode==13){
			$("h2").remove();
			pokeName=$("#search").val().toLowerCase();
			console.log(pokeName);
			$.ajax({
				url:"https://pokeapi.co/api/v2/pokemon/"+pokeName+"/",
				method: "GET",
				dataType:"JSON",
				data:{
					'name':pokeName,
				},
				success: function(data){
					console.log(data);
					var abilities = data.abilities.length;
					for (var i=0; i<abilities; i++){
						console.log(data.abilities[i].ability.name);
						var abilityName = data.abilities[i].ability.name;
						abilityName = abilityName.replace('-',' ');
						if(i==0){
							var newHeader = $("<h2 class='ability'><span class='name'>"+pokeName+"</span> has the ability <span class='name'>"+abilityName+"</span></h2>");
						} else{
								var newHeader = $("<h2 class='ability'><span class='name'>"+pokeName+"</span> also has the ability <span class='name'>"+abilityName+"</span></h2>");
						}
						$("body").append(newHeader);
						$(".name").css("text-transform","capitalize")
					}
				},
				error: function(data, textStatus, errorThrown){
					console.log("this is the weakest link");
					console.log(errorThrown);
					var newHeader = $("<h2>Sorry, we were not able to find anything according to your request :(</h2>");
					$("body").append(newHeader);
				}
			})
		}
	})
})