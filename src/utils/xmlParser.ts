import type { Task } from "../types";

export const parseXMLToTask = (xmlString: string): Task => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, "text/xml");
  
    const item = doc.querySelector("item");
    if (!item) {
      throw new Error("Não encontrei nenhum <item> no XML.");
    }
  
    const getText = (el?: Element | null) =>
      el?.textContent?.replace(/\s+/g, " ").trim() ?? "";
  
    const id = getText(item.querySelector("key"));
    const code = id;
    const title = getText(item.querySelector("summary"));
  
    const description = getText(item.querySelector("description")); // mantém como texto
    const type = getText(item.querySelector("type"));
  
    const environments = Array.from(item.querySelectorAll("component"))
      .map(getText)
      .filter(Boolean);
  
    // Horas → Estimativa de horas
    let hours = 0;
    const hoursField = Array.from(item.querySelectorAll("customfield")).find(
      (cf) =>
        cf.getAttribute("id") === "customfield_10900" ||
        getText(cf.querySelector("customfieldname")).toLowerCase() ===
          "estimativa de horas"
    );
    const hoursStr = getText(hoursField?.querySelector("customfieldvalue"));
    if (hoursStr && !Number.isNaN(parseFloat(hoursStr))) {
      hours = parseFloat(hoursStr);
    }
  
    // Status → map para todo/doing/done
    const statusText = getText(item.querySelector("status")).toLowerCase();
    let status: Task["status"] = "todo";
    if (statusText.includes("desenv")) status = "doing";
    else if (statusText.includes("feito") || statusText.includes("concluído"))
      status = "done";
  
    return {
      id,
      code,
      title,
      description,
      type,
      environments,
      hours,
      status,
    } as Task;
  };
  