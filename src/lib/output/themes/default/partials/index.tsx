import { wbr } from "../../lib";
import type { DefaultThemeRenderContext } from "../DefaultThemeRenderContext";
import { JSX } from "../../../../utils";
import type { ContainerReflection, ReflectionCategory } from "../../../../models";
import { icons } from "./icon";

function renderCategory(
    { urlTo }: DefaultThemeRenderContext,
    item: ReflectionCategory,
    cssClasses?: string,
    prependName = ""
) {
    return (
        <section class={"tsd-index-section " + cssClasses}>
            <h3 class="tsd-index-heading" role="button" aria-expanded="false" tabIndex={0}>
                {prependName ? `${prependName} - ${item.title}` : item.title}
            </h3>
            <div class="tsd-index-list">
                {item.children.map((item) => (
                    <a href={urlTo(item)} class={"tsd-index-link " + item.cssClasses}>
                        {icons[item.kind]()}
                        <span>{item.name ? wbr(item.name) : <em>{wbr(item.kindString!)}</em>}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}

export function index(context: DefaultThemeRenderContext, props: ContainerReflection) {
    let content: JSX.Element[] = [];

    if (props.categories?.length) {
        content = props.categories.map((item) => renderCategory(context, item));
    } else if (props.groups?.length) {
        content = props.groups.flatMap((item) =>
            item.categories
                ? item.categories.map((item2) => renderCategory(context, item2, item.cssClasses, item.title))
                : renderCategory(context, item)
        );
    }

    return (
        <section class="tsd-panel-group tsd-index-group">
            <section class="tsd-panel tsd-index-panel">
                <details class="tsd-index-content tsd-index-accordion" open={true}>
                    <summary class="tsd-accordion-summary tsd-index-summary">
                        <h5 class="tsd-index-heading uppercase" role="button" aria-expanded="false" tabIndex={0}>
                            {icons.chevronSmall()} Index
                        </h5>
                    </summary>
                    <div class="tsd-accordion-details">{content}</div>
                </details>
            </section>
        </section>
    );
}
