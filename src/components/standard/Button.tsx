import { useContext } from 'react'
import { ThemeContext } from '../../contexts/Theme'
import styled from "styled-components";


interface ButtonProps {
    width?: string
    height?: string
    padding?: string
    buttonColor?: string
    color?: string
    children?: string | JSX.Element | JSX.Element[] | null 
    darkButtonColor?: string
    onClick?: any
}

export const TransparentButton = styled.button`
    min-width: ${(props: ButtonProps) => props.width ? props.width : "40px"};
    min-height: ${(props: ButtonProps) => props.height ? props.height : "40px"};
    background-color: transparent;
    color: ${(props: ButtonProps) => props.buttonColor ? props.buttonColor : "black"};
    
    border-style: solid;
    border-radius: 5px;
    border-color: ${(props: ButtonProps) => props.buttonColor ? props.buttonColor : "black"};
    border-width: 1px;

    font-size: 20px;

    padding: ${(props: ButtonProps) => props.padding ? props.padding : "0 20px 0 20px"};

    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;

    transition: 300ms ease;

    &:hover {
        background-color: ${(props: ButtonProps) => props.buttonColor ? props.buttonColor : "black"};
        color: white;
        cursor: pointer;
    }
`

// SolidButton color should be dimmed a little bit.
export const SolidButton = styled.button`
    min-width: ${(props: ButtonProps) => props.width ? props.width : "40px"};
    min-height: ${(props: ButtonProps) => props.height ? props.height : "40px"};
    background-color: ${(props: ButtonProps) => props.buttonColor ? props.buttonColor : "black"};
    color: ${(props: ButtonProps) => props.color ? props.color : "white"};

    opacity: 0.8;

    font-size: 20px;

    border-radius: 5px;

    padding: ${(props: ButtonProps) => props.padding ? props.padding : "0 20px 0 20px"};

    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    

    transition: 300ms ease;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`

export function DynamicTransparentButton({width , height , buttonColor , darkButtonColor , color , children , onClick}: ButtonProps) {
    
    const { theme } = useContext(ThemeContext)
    
    const styles = {
        default: {
            color: "black"
        },
        dark: {
            color: "white"
        }
    }

    return(
        <TransparentButton 
            width={width} 
            height={height}
            buttonColor={
                theme === "light" ? 
                    buttonColor 
                    :
                    (darkButtonColor ?
                        darkButtonColor 
                        : 
                        (buttonColor ?
                            buttonColor 
                            :
                             styles.dark.color)
                    )    
            }
            onClick={onClick}
        >{ children }</TransparentButton>
    )
}
export function DynamicSolidButton({width , height , buttonColor , darkButtonColor , color , children , onClick}: ButtonProps) {

    const { theme } = useContext(ThemeContext)

    const styles = {
        default: {
            color: "white",
            backgroundColor: "black"
        }
    }

    return(
        <SolidButton 
            width={width} 
            height={height}
            buttonColor={
                theme === "light" ?
                    buttonColor
                    :
                    (darkButtonColor ? 
                        darkButtonColor : styles.default.color)
            }
            color={
                theme === "light" ?
                    color
                :
                    (darkButtonColor ? 
                        darkButtonColor : styles.default.backgroundColor)
            }
            onClick={onClick}
        >{ children }</SolidButton>
    )
}
