package com.prad.pointofsale.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestParams {

    String title;
    String category_id;
    String sort_by;
    String sort_order;
}
