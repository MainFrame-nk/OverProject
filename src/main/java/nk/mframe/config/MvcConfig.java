package nk.mframe.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addViewController("/user").setViewName("user");
//        registry.addViewController("/admin").setViewName("admin");
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
    }
}
