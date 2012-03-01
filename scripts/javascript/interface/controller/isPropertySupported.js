function isAnimationSupported()
{
	if (isPropertySupported('MozAnimation') | isPropertySupported('WebkitAnimation') | isPropertySupported('MSAnimation') | isPropertySupported('Animation'))
		return true;
	else
		return false;
}

function isPropertySupported(property)
{
	//console.log(property in document.body.style);
	return property in document.body.style;
}
