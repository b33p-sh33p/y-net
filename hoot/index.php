<!DOCTYPE html>
<html>
<head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script data-ad-client="ca-pub-6415742344964706" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-144187121-1"></script>
	<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'UA-144187121-1');
	</script>

	<meta name="viewport" content="width=device-width,initial-scale=1.0">

	<link href="https://fonts.googleapis.com/css?family=Montserrat:900&display=swap" rel="stylesheet"> 
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="style.css">

	<title>Kahoot Flooder!</title>
</head>
<body>
	<div class="vertical-center">
		<div class="container">
			<h1>Kahoot Flooder!</h1>

			<div class="row">
				<div class="col-lg-4 col-md-3 col-sm-2 col-2">
				</div>
				<div class="col-lg-4 col-md-6 col-sm-8 col-8">
					<form onsubmit="return beginFlood()">
						<div class="form-group">
							<input type="number" class="form-control" id="pin" placeholder="Game PIN">
						</div>

						<div class="form-group">
							<input type="text" class="form-control" id="name" placeholder="Bot name">
						</div>

						<div class="form-group">
							<input type="number" class="form-control" id="amount" placeholder="Amount">
						</div>

						<button type="submit" class="btn btn-dark">Flood!</button>
					</form>
				</div>
				<div class="col-lg-4 col-md-3 col-sm-8 col-2">
				</div>
			</div>
		</div>
	</div>
	<script>
		alert("You can visit our github @ github.com/singhpk1/nauticahoot/ in order to make your own kahoot botter! Originally from kahootflooder.com")
	</script>
	<script src="kahoot.js"></script>
</body>
</html>
