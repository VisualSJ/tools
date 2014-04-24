cc.IMEKeyboardNotificationInfo = function (begin, end, duration) {
    this.begin = begin || cc.rect(0, 0, 0, 0);
    this.end = end || cc.rect(0, 0, 0, 0);
    this.duration = duration || 0
};
cc.IMEDelegate = cc.Class.extend({ctor: function () {
    cc.imeDispatcher.addDelegate(this)
}, removeDelegate: function () {
    cc.imeDispatcher.removeDelegate(this)
}, attachWithIME: function () {
    return cc.imeDispatcher.attachDelegateWithIME(this)
}, detachWithIME: function () {
    return cc.imeDispatcher.detachDelegateWithIME(this)
}, canAttachWithIME: function () {
    return false
}, didAttachWithIME: function () {
}, canDetachWithIME: function () {
    return false
}, didDetachWithIME: function () {
}, insertText: function (text, len) {
}, deleteBackward: function () {
},
    getContentText: function () {
        return""
    }, keyboardWillShow: function (info) {
    }, keyboardDidShow: function (info) {
    }, keyboardWillHide: function (info) {
    }, keyboardDidHide: function (info) {
    }});
cc.IMEDispatcher = cc.Class.extend({_domInputControl: null, impl: null, _currentInputString: "", _lastClickPosition: null, ctor: function () {
    this.impl = new cc.IMEDispatcher.Impl;
    this._lastClickPosition = cc.p(0, 0)
}, init: function () {
    if (cc.sys.isMobile)return;
    this._domInputControl = cc.$("#imeDispatcherInput");
    if (!this._domInputControl) {
        this._domInputControl = cc.$new("input");
        this._domInputControl.setAttribute("type", "text");
        this._domInputControl.setAttribute("id", "imeDispatcherInput");
        this._domInputControl.resize(0,
            0);
        this._domInputControl.translates(0, 0);
        this._domInputControl.style.opacity = "0";
        this._domInputControl.style.fontSize = "1px";
        this._domInputControl.setAttribute("tabindex", 2);
        this._domInputControl.style.position = "absolute";
        this._domInputControl.style.top = 0;
        this._domInputControl.style.left = 0;
        document.body.appendChild(this._domInputControl)
    }
    var selfPointer = this;
    cc._addEventListener(this._domInputControl, "input", function () {
        selfPointer._processDomInputString(selfPointer._domInputControl.value)
    }, false);
    cc._addEventListener(this._domInputControl, "keydown", function (e) {
        if (e.keyCode === cc.KEY.tab) {
            e.stopPropagation();
            e.preventDefault()
        } else if (e.keyCode == cc.KEY.enter) {
            selfPointer.dispatchInsertText("\n", 1);
            e.stopPropagation();
            e.preventDefault()
        }
    }, false);
    if (/msie/i.test(navigator.userAgent))cc._addEventListener(this._domInputControl, "keyup", function (e) {
        if (e.keyCode == cc.KEY.backspace)selfPointer._processDomInputString(selfPointer._domInputControl.value)
    }, false);
    cc._addEventListener(window, "mousedown",
        function (event) {
            var tx = event.pageX || 0;
            var ty = event.pageY || 0;
            selfPointer._lastClickPosition.x = tx;
            selfPointer._lastClickPosition.y = ty
        }, false)
}, _processDomInputString: function (text) {
    var i, startPos;
    var len = this._currentInputString.length < text.length ? this._currentInputString.length : text.length;
    for (startPos = 0; startPos < len; startPos++)if (text[startPos] !== this._currentInputString[startPos])break;
    var delTimes = this._currentInputString.length - startPos;
    var insTimes = text.length - startPos;
    for (i = 0; i < delTimes; i++)this.dispatchDeleteBackward();
    for (i = 0; i < insTimes; i++)this.dispatchInsertText(text[startPos + i], 1);
    this._currentInputString = text
}, dispatchInsertText: function (text, len) {
    if (!this.impl || !text || len <= 0)return;
    if (!this.impl._delegateWithIme)return;
    this.impl._delegateWithIme.insertText(text, len)
}, dispatchDeleteBackward: function () {
    if (!this.impl)return;
    if (!this.impl._delegateWithIme)return;
    this.impl._delegateWithIme.deleteBackward()
}, getContentText: function () {
    if (this.impl && this.impl._delegateWithIme) {
        var pszContentText = this.impl._delegateWithIme.getContentText();
        return pszContentText ? pszContentText : ""
    }
    return""
}, dispatchKeyboardWillShow: function (info) {
    if (this.impl)for (var i = 0; i < this.impl._delegateList.length; i++) {
        var delegate = this.impl._delegateList[i];
        if (delegate)delegate.keyboardWillShow(info)
    }
}, dispatchKeyboardDidShow: function (info) {
    if (this.impl)for (var i = 0; i < this.impl._delegateList.length; i++) {
        var delegate = this.impl._delegateList[i];
        if (delegate)delegate.keyboardDidShow(info)
    }
}, dispatchKeyboardWillHide: function (info) {
    if (this.impl)for (var i = 0; i < this.impl._delegateList.length; i++) {
        var delegate =
            this.impl._delegateList[i];
        if (delegate)delegate.keyboardWillHide(info)
    }
}, dispatchKeyboardDidHide: function (info) {
    if (this.impl)for (var i = 0; i < this.impl._delegateList.length; i++) {
        var delegate = this.impl._delegateList[i];
        if (delegate)delegate.keyboardDidHide(info)
    }
}, addDelegate: function (delegate) {
    if (!delegate || !this.impl)return;
    if (this.impl._delegateList.indexOf(delegate) > -1)return;
    this.impl._delegateList.splice(0, 0, delegate)
}, attachDelegateWithIME: function (delegate) {
    if (!this.impl || !delegate)return false;
    if (this.impl._delegateList.indexOf(delegate) == -1)return false;
    if (this.impl._delegateWithIme) {
        if (!this.impl._delegateWithIme.canDetachWithIME() || !delegate.canAttachWithIME())return false;
        var pOldDelegate = this.impl._delegateWithIme;
        this.impl._delegateWithIme = null;
        pOldDelegate.didDetachWithIME();
        this._focusDomInput(delegate);
        return true
    }
    if (!delegate.canAttachWithIME())return false;
    this._focusDomInput(delegate);
    return true
}, _focusDomInput: function (delegate) {
    if (cc.sys.isMobile) {
        this.impl._delegateWithIme =
            delegate;
        delegate.didAttachWithIME();
        this._currentInputString = delegate.string || "";
        var userInput = prompt("please enter your word:", this._currentInputString);
        if (userInput != null)this._processDomInputString(userInput);
        this.dispatchInsertText("\n", 1)
    } else {
        this.impl._delegateWithIme = delegate;
        this._currentInputString = delegate.string || "";
        delegate.didAttachWithIME();
        this._domInputControl.focus();
        this._domInputControl.value = this._currentInputString;
        this._domInputControlTranslate()
    }
}, _domInputControlTranslate: function () {
    if (/msie/i.test(navigator.userAgent)) {
        this._domInputControl.style.left =
            this._lastClickPosition.x + "px";
        this._domInputControl.style.top = this._lastClickPosition.y + "px"
    } else this._domInputControl.translates(this._lastClickPosition.x, this._lastClickPosition.y)
}, detachDelegateWithIME: function (delegate) {
    if (!this.impl || !delegate)return false;
    if (this.impl._delegateWithIme != delegate)return false;
    if (!delegate.canDetachWithIME())return false;
    this.impl._delegateWithIme = null;
    delegate.didDetachWithIME();
    cc._canvas.focus();
    return true
}, removeDelegate: function (delegate) {
    if (!this.impl || !delegate)return;
    if (this.impl._delegateList.indexOf(delegate) == -1)return;
    if (this.impl._delegateWithIme)if (delegate == this.impl._delegateWithIme)this.impl._delegateWithIme = null;
    cc.arrayRemoveObject(this.impl._delegateList, delegate)
}, processKeycode: function (keyCode) {
    if (keyCode < 32)if (keyCode == cc.KEY.backspace)this.dispatchDeleteBackward(); else if (keyCode == cc.KEY.enter)this.dispatchInsertText("\n", 1); else if (keyCode == cc.KEY.tab); else {
        if (keyCode == cc.KEY.escape);
    } else if (keyCode < 255)this.dispatchInsertText(String.fromCharCode(keyCode),
        1); else;
}});
cc.IMEDispatcher.Impl = cc.Class.extend({_delegateWithIme: null, _delegateList: null, ctor: function () {
    this._delegateList = []
}, findDelegate: function (delegate) {
    for (var i = 0; i < this._delegateList.length; i++)if (this._delegateList[i] == delegate)return i;
    return null
}});
cc.imeDispatcher = new cc.IMEDispatcher;
document.body ? cc.imeDispatcher.init() : cc._addEventListener(window, "load", function () {
    cc.imeDispatcher.init()
}, false);
cc.TextFieldDelegate = cc.Class.extend({onTextFieldAttachWithIME: function (sender) {
    return false
}, onTextFieldDetachWithIME: function (sender) {
    return false
}, onTextFieldInsertText: function (sender, text, len) {
    return false
}, onTextFieldDeleteBackward: function (sender, delText, len) {
    return false
}, onDraw: function (sender) {
    return false
}});
cc.TextFieldTTF = cc.LabelTTF.extend({delegate: null, colorSpaceHolder: null, _lens: null, _inputText: "", _placeHolder: "", _charCount: 0, _className: "TextFieldTTF", ctor: function (placeholder, dimensions, alignment, fontName, fontSize) {
    this.colorSpaceHolder = cc.color(127, 127, 127);
    cc.imeDispatcher.addDelegate(this);
    cc.LabelTTF.prototype.ctor.call(this);
    if (fontSize !== undefined) {
        this.initWithPlaceHolder("", dimensions, alignment, fontName, fontSize);
        if (placeholder)this.setPlaceHolder(placeholder)
    } else if (fontName === undefined &&
        alignment !== undefined) {
        this.initWithString("", arguments[1], arguments[2]);
        if (placeholder)this.setPlaceHolder(placeholder)
    }
}, getDelegate: function () {
    return this.delegate
}, setDelegate: function (value) {
    this.delegate = value
}, getCharCount: function () {
    return this._charCount
}, getColorSpaceHolder: function () {
    return this.colorSpaceHolder
}, setColorSpaceHolder: function (value) {
    this.colorSpaceHolder = value
}, initWithPlaceHolder: function (placeholder, dimensions, alignment, fontName, fontSize) {
    switch (arguments.length) {
        case 5:
            if (placeholder)this.setPlaceHolder(placeholder);
            return this.initWithString(this._placeHolder, fontName, fontSize, dimensions, alignment);
            break;
        case 3:
            if (placeholder)this.setPlaceHolder(placeholder);
            return this.initWithString(this._placeHolder, arguments[1], arguments[2]);
            break;
        default:
            throw"Argument must be non-nil ";
            break
    }
}, setString: function (text) {
    text = String(text);
    this._inputText = text || "";
    if (!this._inputText.length)cc.LabelTTF.prototype.setString.call(this, this._placeHolder); else cc.LabelTTF.prototype.setString.call(this, this._inputText);
    this._charCount =
        this._inputText.length
}, getString: function () {
    return this._inputText
}, setPlaceHolder: function (text) {
    this._placeHolder = text || "";
    if (!this._inputText.length)cc.LabelTTF.prototype.setString.call(this, this._placeHolder)
}, getPlaceHolder: function () {
    return this._placeHolder
}, draw: function (ctx) {
    var context = ctx || cc._renderContext;
    if (this.delegate && this.delegate.onDraw(this))return;
    if (this._inputText && this._inputText.length > 0) {
        cc.LabelTTF.prototype.draw.call(this, context);
        return
    }
    var color = this.color;
    this.color =
        this.colorSpaceHolder;
    if (cc._renderType === cc._RENDER_TYPE_CANVAS)this._updateTexture();
    cc.LabelTTF.prototype.draw.call(this, context);
    this.color = color
}, visit: function (ctx) {
    this._super(ctx)
}, attachWithIME: function () {
    return cc.imeDispatcher.attachDelegateWithIME(this)
}, detachWithIME: function () {
    return cc.imeDispatcher.detachDelegateWithIME(this)
}, canAttachWithIME: function () {
    return this.delegate ? !this.delegate.onTextFieldAttachWithIME(this) : true
}, didAttachWithIME: function () {
}, canDetachWithIME: function () {
    return this.delegate ?
        !this.delegate.onTextFieldDetachWithIME(this) : true
}, didDetachWithIME: function () {
}, deleteBackward: function () {
    var strLen = this._inputText.length;
    if (strLen == 0)return;
    var deleteLen = 1;
    if (this.delegate && this.delegate.onTextFieldDeleteBackward(this, this._inputText[strLen - deleteLen], deleteLen))return;
    if (strLen <= deleteLen) {
        this._inputText = "";
        this._charCount = 0;
        cc.LabelTTF.prototype.setString.call(this, this._placeHolder);
        return
    }
    this.string = this._inputText.substring(0, strLen - deleteLen)
}, removeDelegate: function () {
    cc.imeDispatcher.removeDelegate(this)
},
    insertText: function (text, len) {
        var sInsert = text;
        var pos = sInsert.indexOf("\n");
        if (pos > -1)sInsert = sInsert.substring(0, pos);
        if (sInsert.length > 0) {
            if (this.delegate && this.delegate.onTextFieldInsertText(this, sInsert, sInsert.length))return;
            var sText = this._inputText + sInsert;
            this._charCount = sText.length;
            this.string = sText
        }
        if (pos == -1)return;
        if (this.delegate && this.delegate.onTextFieldInsertText(this, "\n", 1))return;
        this.detachWithIME()
    }, getContentText: function () {
        return this._inputText
    }, keyboardWillShow: function (info) {
    },
    keyboardDidShow: function (info) {
    }, keyboardWillHide: function (info) {
    }, keyboardDidHide: function (info) {
    }});
var _p = cc.TextFieldTTF.prototype;
_p.charCount;
cc.defineGetterSetter(_p, "charCount", _p.getCharCount);
_p.placeHolder;
cc.defineGetterSetter(_p, "placeHolder", _p.getPlaceHolder, _p.setPlaceHolder);
cc.TextFieldTTF.create = function (placeholder, dimensions, alignment, fontName, fontSize) {
    return new cc.TextFieldTTF(placeholder, dimensions, alignment, fontName, fontSize)
};