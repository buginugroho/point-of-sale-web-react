package com.prad.pointofsale.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductsResponse {
    
    private Long id;
    private String title;
    private Long price;
    private String image;
    private Long category_id;
    private String category_name;
}
