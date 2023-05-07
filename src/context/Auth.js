
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useProvider } from "wagmi";
const Auth = createContext({});

export const AuthProvider = ({ children }) => {

    const { address } = useAccount();
	const [HTML, SETHTML] = useState()

	return (
		<Auth.Provider
			value={{
				address,
				HTML, SETHTML
			}}
		>
		{children}
		</Auth.Provider>
	);
};

export default Auth;
