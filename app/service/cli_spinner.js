import ora from "ora"
const spinner = ora()

export default {
    start: (options) => {
        spinner.color = options.loader_color || "magenta"
        spinner.text = options.cli_text || "STARTING APP"
        spinner.start()
    },
    changeSpinnerColor: (options) => {
        spinner.color = options.loader_color || "magenta"
    },
    changeSpinnerText: (options) => {
        spinner.text = options.cli_text
    },
    succeed: () => {
        spinner.succeed();
    }
}