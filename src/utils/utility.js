export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const getTags = (tags, minTagDisplay, keys) => {
  const moreTags = tags.slice(minTagDisplay).slice(0, -1);
  const customTagIndex = tags.length - 1;
  let customTag = {};
  if (tags.length > minTagDisplay) {
    customTag = tags[customTagIndex];
    customTag = { ...customTag, [keys[1]]: `${moreTags.length} More` };
    return [[...tags.slice(0, minTagDisplay), customTag], moreTags];
  }
  return [tags, moreTags];
};

export const validateTag = tag => {
  //return true;
  // ^([a-zA-Z]+):(\w+)$
  //const regex = /([A-Z][a-z]+):{1}\w+/gm;
  // const regex = /^([a-zA-Z]+):(\w+)$/gm;
  const regex = /^([a-zA-Z]+):([a-zA-Z0-9]+)(?=[\w<>'"/;`%~@#$^*()_+=[\]{}|\\,.? -]*$)/gm;
  return regex.test(tag);
};

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getSearchFilterApiPayload = (
  tags,
  users,
  startDate,
  endDate,
  MIN_TAGS_TO_DISPLAY
) => {
  const tagsList = tags.length ? tags.map(tag => tag.tag_name) : [];
  const usersList = users.length ? users.map(user => user.username) : [];
  const tag_name = tagsList.length > MIN_TAGS_TO_DISPLAY ? tagsList.slice(0, -1) : tagsList;
  const username = usersList.length > MIN_TAGS_TO_DISPLAY ? usersList.slice(0, -1) : usersList;
  const payload = {
    tag_name,
    username,
    start_date: startDate ? startDate.format("MM/DD/YYYY") : "",
    end_date: endDate ? endDate.format("MM/DD/YYYY") : ""
  };
  return payload;
};

export const downloadFile = (content, filename, ext) => {
  const url = window.URL.createObjectURL(new Blob([content]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.${ext}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const copyToClipBoard = (val, el) => {
  if(document.getElementsByClassName('copy-popup')[0]){
    document.querySelector( '.copy-popup' ).remove();
  }
  if(document.getElementsByClassName('copy-input')[0]){
    document.querySelector( '.copy-input' ).remove();
  }
  const msg = document.createElement("small");
  msg.classList.add("copy-popup");
  msg.innerHTML = "Copied";
  const input = document.createElement("input");
  input.classList.add("copy-input");
  input.value = val;
  document.body.appendChild(input)
  input.select();
  document.execCommand("copy");
  document.getElementById(el).appendChild(msg);
  setTimeout(() => {
    msg.remove();
  }, 1000);
};

export const numberToString = (value) => {
	return {
    1: "one",
		2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    15: "fifteen",
    20: "twenty"
	}[value];
}