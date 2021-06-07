#include <array>
#include <functional>
#include <iostream>
#include <node/node.h>
#include <stack>
#include <stdio.h>
#include <stdlib.h>
#include <thread>
#include <unistd.h>
#include <uv.h>
#include <vector>
namespace demo
{
    using v8::Function;
    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Object;
    using v8::String;
    using v8::Value;

    void Method(const FunctionCallbackInfo<Value> &args)
    {
        std::cout << args.Length() << std::endl;
        Isolate *isolate = args.GetIsolate();
        args.GetReturnValue()
            .Set(String::NewFromUtf8(isolate, "hello world").ToLocalChecked());
    }

    void Initialize(Local<Function> exports)
    {
        NODE_SET_METHOD(exports, "hello", Method);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize);
}
