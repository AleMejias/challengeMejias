import {
    trigger,
    state,
    animate,
    transition,
    style,
    sequence,
} from "@angular/animations";

export const FadeInAnimation = trigger("fadeIn", [
    state(
        "show",
        style({
            opacity: 1,
            visibility: "visible",
        })
    ),
    state(
        "hide",
        style({
            opacity: 0,
            visibility: "hidden",
        })
    ),
    transition("show => hide", animate("300ms ease-out")),
    transition("hide => show", animate("300ms ease-in")),

    transition("* => void", [
        style({
            height: "*",
            opacity: "1",
            transform: "translateX(0)",
            "box-shadow": "0 1px 4px 0 rgba(0, 0, 0, 0.3)",
            background: "#fae5ac",
        }),
        sequence([
            animate(
                ".25s ease",
                style({
                    height: "*",
                    opacity: ".2",
                    transform: "translateX(20px)",
                    "box-shadow": "none",
                    background: "#fae5ac",
                })
            ),
            animate(
                ".1s ease",
                style({
                    height: "0",
                    opacity: 0,
                    transform: "translateX(20px)",
                    "box-shadow": "none",
                    background: "#fae5ac",
                })
            ),
        ]),
    ]),
    transition("void => *", [
        style({
            opacity: "0",
            transform: "translateY(20px)",
            background: "#F0FFFF",
        }),
        sequence([
            animate(
                ".5s ease-in",
                style({ opacity: "1", transform: "translateY(2px)" })
            ),
        ]),
    ]),
]);

