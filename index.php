<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
  <head>
    <link type="text/css" href="./css/main.css" rel="stylesheet">
    <link type="text/css" href="./css/anaglyph_text.css" rel="stylesheet">
    <link type="text/css" href="./css/canvas.css" rel="stylesheet">
    <link type="text/css" href="./css/background.css" rel="stylesheet">
</head>
<body>
	<div id="head">
		<h1>Hackenbush</h1>
	</div>
	<div class="vague_bg1" id="fixedbg1" style="left: 0px;"></div>
	<div class="vague_bg2" id="fixedbg2" style="left: 0px;"></div>
	<div id="main">
		<div id="main-container"></div>
	</div>
	<div id="main-bottom">
		<a class="selected" id="canvas" href="#canvas">Canvas</a> | 
		<a class="selected" id="tests" href="#tests">Tests</a>
	</div>
	<div id="foot">
		<p>
			<b>3D Approved</b><br/>
			<b>Hackenbush by BABOL Arnaud and SIMMONEAU Guillaume</b>
		</p>
	</div>
	<script type="text/javascript" src="./scripts/javascript/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="./scripts/javascript/interface/controller/reloadPage.js"></script>
	<script type="text/javascript" src="./scripts/javascript/interface/view/page.js"></script>
	<script type="text/javascript" src="./scripts/javascript/interface/view/background.js"></script>
	
	<script type ="text/javascript" src ="./scripts/javascript/Exception/Exception.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript//Exception/NodeException/NodeException.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Exception/NodeException/UnexistingNodeException.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Exception/NodeException/AlreadyExistingNodeException.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Exception/NodeException/InvalidIdException.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Exception/NodeException/AlreadyGroundedNodeException.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Exception/NodeException/NotConnectedToGroundException.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Exception/EdgeException/EdgeException.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Exception/EdgeException/AlreadyExistingEdgeException.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Exception/EdgeException/UnexistingEdgeException.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Exception/IndexException/InvalidIndexException.js"></script>
    
    <script type ="text/javascript" src ="./scripts/javascript/Graph/Node.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Graph/Edge.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Graph/AbstractSimpleGraph.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Graph/AbstractHackenbushGraph.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Graph/SimpleGraph.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Graph/MultiGraph.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/Graph/HackenbushGraph.js"></script>
    
    <script type ="text/javascript" src ="./scripts/javascript/interface/controller/controller.js"></script>
    <script type ="text/javascript" src ="./scripts/javascript/interface/modele/modele.js"></script>
    
</body>
</html>