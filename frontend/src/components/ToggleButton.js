import { Button } from "@chakra-ui/react"
import { useColorMode } from "@chakra-ui/color-mode"
import { MoonIcon, SunIcon } from "lucide-react"

export default function ToggleButon() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <header>
            <Button onClick={toggleColorMode} >
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
        </header>
    )
}