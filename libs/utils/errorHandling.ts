export function errMsgFilter(errMsg, _account): string {
	const errors = {
		"Invalid Transaction (0)": "Bad signature",
		"Invalid Transaction (1)": "Nonce too low",
		"Invalid Transaction (2)": "Nonce too high",
		"Invalid Transaction (3)": "Invalid Transaction (3)",
		"Invalid Transaction (255)":
			"Block is full, no more extrinsics can be applied",
		"Priority is too low":
			"A transaction in your account with the same nonce is stuck in the pool",
	};

	const newErrMsg = errMsg;

	Object.keys(errors).forEach((key) => {
		const value = errors[key];
		if (errMsg.message.includes(key)) {
			newErrMsg.message = value;
		}
	});

	// newErrMsg.message = `${newErrMsg.message} - Account: ${account}`;
	return newErrMsg;
}
